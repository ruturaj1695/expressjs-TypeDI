import express, { Router, Request, Response, NextFunction } from "express";
import { UserRoute } from "./user/routes/user.route";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import Container, { Service } from "typedi";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import expressRateLimit from "express-rate-limit";

@Service()
export class App {
  private app: express.Application;
  private routes: Router[];
  private port: number;

  constructor(userRoute: UserRoute) {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.routes = [userRoute.router];
    this.initializeMiddlewares();
    this.initializeRoute();
    this.initializeErrorHandling();
  }

  private initializeRoute() {
    this.routes.forEach((route: Router) => {
      this.app.use("/api", route);
    });
  }

  private initializeErrorHandling() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        Container.get(ErrorMiddleware).error(err, req, res, next);
      },
    );
  }

  private initializeMiddlewares() {
    const rateLimit = expressRateLimit({
      /* 15 mins */
      windowMs: 15 * 60 * 1000,
      /* Limit each IP to 100 requests per windowMs */
      limit: 100,
      /* Error message will display with 429 status code */
      message: "Too many requests, please try again later!",
      /* Sends headers with rate limit */
      standardHeaders: false,
      /* Disable X-RateLimit-* headers */
      legacyHeaders: false,
    });

    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(rateLimit);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port: ${this.port}`);
    });
  }
}
