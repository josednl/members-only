import express, { type Express } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import prisma from './config/prisma.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Session configuration with persistent PostgreSQL store
const PgSession = connectPgSimple(session);
app.use(session({
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Global user middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

function serializeMessages(
  messages: Array<{ id: string; title: string; text: string; timestamp: Date; author: { firstName: string; lastName: string } }>,
  user: Express.User | undefined,
): Array<{ id: string; title: string; text: string; timestamp: string; authorName: string; canDelete: boolean }> {
  const isMemberOrAdmin = !!(user && ((user as any).isMember || (user as any).isAdmin));
  const isAdmin = !!(user && (user as any).isAdmin);
  return messages.map(msg => ({
    id: msg.id,
    title: msg.title,
    text: msg.text,
    timestamp: msg.timestamp.toISOString(),
    authorName: isMemberOrAdmin ? `${msg.author.firstName} ${msg.author.lastName}` : 'Anonymous',
    canDelete: isAdmin,
  }));
}

// Routes
app.use('/', authRoutes);
app.use('/messages', messageRoutes);

app.get('/', async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      include: { author: true },
      orderBy: { timestamp: 'desc' },
    });

    const serialized = serializeMessages(messages, req.user);
    const pageData = {
      messages: serialized,
      currentUser: req.user
        ? {
            isLoggedIn: true,
            firstName: (req.user as any).firstName,
            isMember: (req.user as any).isMember,
            isAdmin: (req.user as any).isAdmin,
          }
        : { isLoggedIn: false },
    };

    res.render('index', { title: 'Members Only Message Board', pageDataJson: JSON.stringify(pageData) });
  } catch (err) {
    next(err);
  }
});

app.get('/api/messages', async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      include: { author: true },
      orderBy: { timestamp: 'desc' },
    });

    const serialized = serializeMessages(messages, req.user);
    res.json({ messages: serialized });
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
