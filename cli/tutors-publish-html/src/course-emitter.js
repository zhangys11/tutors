"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitCourse = exports.emitWalls = void 0;
const sh = __importStar(require("shelljs"));
const file_utils_1 = require("tutors-gen-lib/src/generator/file-utils");
const nunjucks = __importStar(require("nunjucks"));
const root = __dirname;
nunjucks.configure(root + "/views", { autoescape: false });
nunjucks.installJinjaCompat();
function publishTemplate(path, file, template, lo) {
    (0, file_utils_1.writeFile)(path, file, nunjucks.render(template, { lo: lo }));
}
function emitNote(lo, path) {
    const notePath = `${path}/${lo.id}`;
    publishTemplate(notePath, "index.html", "Note.njk", lo);
}
function emitLab(lo, path) {
    const labPath = `${path}/${lo.id}`;
    publishTemplate(labPath, "index.html", "Lab.njk", lo);
}
function emitLoPage(lo, path) {
    if (lo.type == "lab") {
        emitLab(lo, path);
    }
    if (lo.type == "note" || lo.type == "panelnote") {
        emitNote(lo, path);
    }
}
function emitUnit(lo, path) {
    lo.los.forEach((lo) => {
        emitLoPage(lo, path);
    });
}
function emitLo(lo, path) {
    if (lo.type == "unit" || lo.type == "side") {
        const unitPath = `${path}/${lo.id}`;
        emitUnit(lo, unitPath);
    }
    else {
        emitLoPage(lo, path);
    }
}
function emitTopic(lo, path) {
    var _a;
    sh.cd(lo.id);
    const topicPath = `${path}/${lo.id}`;
    (_a = lo === null || lo === void 0 ? void 0 : lo.los) === null || _a === void 0 ? void 0 : _a.forEach((lo) => {
        emitLo(lo, topicPath);
    });
    publishTemplate(topicPath, "index.html", "Topic.njk", lo);
    sh.cd("..");
}
function emitWalls(path, lo) {
    var _a;
    (_a = lo.walls) === null || _a === void 0 ? void 0 : _a.forEach((los) => {
        const type = los[0].type;
        lo.los = los;
        if (lo.properties) {
            lo.properties["credits"] = `All ${type}'s in course`;
        }
        publishTemplate(path, `${type}.html`, "Wall.njk", lo);
    });
}
exports.emitWalls = emitWalls;
function emitCourse(path, lo) {
    var _a;
    sh.cd(path);
    (_a = lo === null || lo === void 0 ? void 0 : lo.los) === null || _a === void 0 ? void 0 : _a.forEach((lo) => {
        emitTopic(lo, path);
    });
    publishTemplate(path, "index.html", "Course.njk", lo);
    emitWalls(path, lo);
}
exports.emitCourse = emitCourse;
//# sourceMappingURL=course-emitter.js.map