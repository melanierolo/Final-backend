import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import 'dotenv/config';
import morgan from 'morgan';
import { connectDB } from './connect.js';
import { PORT } from './config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
// Generate random : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
import { secretDB } from './config.js';
import UserRouter from './routes/user.js';
import ProductRouter from './routes/product.js';

// Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Settings - the location of the "views" folder
app.set('views', join(__dirname, 'views'));
console.log(join(__dirname, 'views'));

// Set up the handlebars view engine
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

/* -------------- SESSION SETUP ----------------*/
/*app.use(
  session({
    secret: secretDB,
    resave: false, //don't save session if unmodified
    saveUninitialized: true, //  create session until something stored
    store: MongoStore.create({
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'ecommerce-coderhouse(FP)', // Specify the database name here
      collectionName: 'sessions',
      ttl: 10000,
    }),
  })
);*/

app.use('/api/users', UserRouter);
app.use('/api/products', ProductRouter);
/*app.use('/api/cart', CartRouter);*/

//Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor Express Puerto ${PORT}`);
});

// Static files ->  the location of the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Call the function to connect to the database
connectDB();
