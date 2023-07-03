import {LoggerFactory} from "../src/factory";
const logger = LoggerFactory.getLogger("test/factory.test.js")
logger.info("factory test")
// 重新配置,然后输出debug日志
LoggerFactory.configure({
  loggers:[{
    name: "test/factory.test.js",
    level: "debug",
    transportRef:["Console"]
  }]
})
logger.debug("factory test debug")


const logger2 = LoggerFactory.getLogger("test/factory.test2.js")
logger2.info("factory test2")
