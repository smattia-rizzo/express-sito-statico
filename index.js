import express from "express"
import path from "path"
import fs from "fs/promises"
import { createReadStream, createWriteStream } from "fs"
import url from "url"
import morgan from "morgan"
import helmet from "helmet"
import favicon from "serve-favicon"

const app = express();
const port = 3000
const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); 

app.set('port',process.env.PORT || 3000);
app.set('appName', 'Server Web statico');

//app.use(express.static(path.join(__dirname, 'public')));    //cartella per i file statici come immagini, css, js
app.use(express.urlencoded({ extended: true })); //per gestire i dati inviati tramite form in post

//Middleweare Morgan: per la creazione di un logger
const accessLogStream = createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));

//Middleweare sicurezza helmet
app.use(helmet());


//Middleweare personalizzato che scopre l'oggetto request
//visualizzando non solo le sue proprietà, ma anche i suoi metodi.
app.use(function (req,res,next){	
	console.log('url: ',req.url);
	
	console.log('Request Type: ',req.method);
	console.log('Ip del client: ',req.ip);
	console.log('');
	next();
});

//Middleweare favicon: gestisce il favicon del sito Web
app.use(favicon(path.join(__dirname, 'public','favicon.ico')))

app.use(express.static(path.join(__dirname,'public','css'), {
    //maxAge: '1d',  // Cache per 1 giorno
    //etag: true    // Disabilita ETag
    maxAge: 0,       // La risorsa scade immediatamente
    etag: false,     // Disabilita l'identificatore di versione
    lastModified: false // Disabilita la data di ultima modifica
}));
app.use(express.static(path.join(__dirname,'public','media'), {
    //maxAge: '1d',  // Cache per 1 giorno
    //etag: true    // Disabilita ETag
    maxAge: 0,       // La risorsa scade immediatamente
    etag: false,     // Disabilita l'identificatore di versione
    lastModified: false // Disabilita la data di ultima modifica
}));
app.use(express.static(path.join(__dirname,'public','html'), {
    //maxAge: '1d',  // Cache per 1 giorno
    //etag: true    // Disabilita ETag
    maxAge: 0,       // La risorsa scade immediatamente
    etag: false,     // Disabilita l'identificatore di versione
    lastModified: false // Disabilita la data di ultima modifica
}));

app.use(express.static(path.join(__dirname,'public','script'), {
    //maxAge: '1d',  // Cache per 1 giorno
    //etag: true    // Disabilita ETag
    maxAge: 0,       // La risorsa scade immediatamente
    etag: false,     // Disabilita l'identificatore di versione
    lastModified: false // Disabilita la data di ultima modifica
}));






//Middleweare che gestisce l’errore nel caso che nessuna route
//vada a buon fine

app.use("/{*any}",(req,res,next) => {
    res.status(404);
    res.send('Url non presente');
});

//Avvio del server su una porta specifica
const server = app.listen(app.get('port'),() => {
    console.log(`Server in ascolto sulla porta ${app.get('port')}`);
});