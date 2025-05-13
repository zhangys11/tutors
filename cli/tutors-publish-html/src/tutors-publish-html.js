#!/usr/bin/env node
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
const fs = __importStar(require("fs"));
const tutors_1 = require("tutors-gen-lib/src/tutors");
const course_emitter_1 = require("./course-emitter");
const versionStr = `tutors-publish-html: ${tutors_1.version}`;
console.log(versionStr);
if (!fs.existsSync("course.md")) {
    console.log("Cannot locate course.md. Change to course folder and try again. ");
}
else {
    const srcFolder = process.cwd();
    const destFolder = `${srcFolder}/html`;
    const lo = (0, tutors_1.parseCourse)(srcFolder);
    (0, tutors_1.generateCourse)(lo, destFolder);
    (0, tutors_1.decorateCourse)(lo);
    (0, course_emitter_1.emitCourse)(destFolder, lo);
}
console.log(versionStr);
//# sourceMappingURL=tutors-publish-html.js.map