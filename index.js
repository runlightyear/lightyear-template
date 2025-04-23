/**
 * Set up the Lightyear handlers and import the project entry point.
 *
 * You should generally not need to edit this file.
 */

import { handler, getDeployList } from "@runlightyear/lightyear";
import "./src";

exports.handler = handler;
global.handler = handler;

exports.getDeployList = getDeployList;
global.getDeployList = getDeployList;
