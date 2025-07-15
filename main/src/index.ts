import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler";
import { RBACMiddleware } from "./middleware/rbac";
import WinstonLogger from "./utils/logger";

import AuthRouter from "./routes/auth";
import ProductRouter from "./routes/product";
import AdsRouter from "./routes/ads";
import BlogRouter from "./routes/blog";
import ContactRouter from "./routes/contact";
import EventRouter from "./routes/event";
import FaqRouter from "./routes/faq";
import SubscriberRouter from "./routes/subscriber";
import OfferRouter from "./routes/offer";
import ProjectRouter from "./routes/project";
import ReviewRouter from "./routes/review";
import TeamMemberRouter from "./routes/teamMember";
import UserRouter from "./routes/user";
import RoleRouter from "./routes/role";
import PermissionRouter from "./routes/permission";
import AdminRouter from "./routes/admin";
import QuoteRouter from "./routes/quote";
import config from "./config/config";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(RBACMiddleware);
    this.app.use(helmet());
    this.app.use(new WinstonLogger().warningLogger());
  }

  private setRoutes() {
    this.app.use("/api/auth", new AuthRouter().routes);
    this.app.use("/api/products", new ProductRouter().routes);
    this.app.use("/api/ads", new AdsRouter().routes);
    this.app.use("/api/blogs", new BlogRouter().routes);
    this.app.use("/api/contacts", new ContactRouter().routes);
    this.app.use("/api/events", new EventRouter().routes);
    this.app.use("/api/faqs", new FaqRouter().routes);
    this.app.use("/api/subscribers", new SubscriberRouter().routes);
    this.app.use("/api/offers", new OfferRouter().routes);
    this.app.use("/api/projects", new ProjectRouter().routes);
    this.app.use("/api/reviews", new ReviewRouter().routes);
    this.app.use("/api/team-members", new TeamMemberRouter().routes);
    this.app.use("/api/users", new UserRouter().routes);
    this.app.use("/api/roles", new RoleRouter().routes);
    this.app.use("/api/permissions", new PermissionRouter().routes);
    this.app.use("/api/admin", new AdminRouter().routes);
    this.app.use("/api/quotes", new QuoteRouter().routes);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.info(`Server running on port ${port}`);
    });
  }
}

const PORT = config.PORT ? parseInt(config.PORT) : 4000;
const server = new App();
server.app.get("/health", (req, res) => {
  res.json({ status: "API running" });
});
server.app.use(errorHandler);
server.listen(PORT);
