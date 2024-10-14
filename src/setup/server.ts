
import appRoute from '../routes/routes';
import compression from 'compression';
import cors from 'cors';
import { Application, json, Request, Response, urlencoded } from 'express';
import actuator from 'express-actuator';
import http from 'http';
import HTTP_STATUS from 'http-status-codes';

const SERVER_PORT = 5000;

export class ExamCareStudentServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this._configureSecurityMiddleware(this.app);
    this._configureMiddleware(this.app);
    this._configureRoutes(this.app);
    this._configureGlobalErrorHandler(this.app);
    this._startServer(this.app);
  }

  private _configureSecurityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private _configureMiddleware(app: Application): void {
    // Enable compression for gzip the api response
    app.use(
      compression({
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
          if (req.headers['x-no-compression']) return false;
          return compression.filter(req, res);
        }
      })
    );
    app.use(json({ limit: '50mb' }));
    app.use(actuator());
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private _configureRoutes = (app: Application) => appRoute(app);

  private _configureGlobalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });
  }

  private async _startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this._startHttpServer(httpServer);
    } catch (error) {
      console.log(error)
    }
  }

  private _startHttpServer(httpServer: http.Server): void {
    console.log(`Worker with process id of ${process.pid} has started...`);
    console.log(`Server has started with process ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  }

}
