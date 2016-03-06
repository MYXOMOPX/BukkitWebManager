import angular from "../../browser/angular"
import babelPolyfill from "../../../../node_modules/babelify/node_modules/babel-core/browser-polyfill.min"
import jquery from "../../browser/jquery"
import bootstrap from "../../../../node_modules/bootstrap/dist/js/bootstrap.min"

import BukkitAPI from "../BukkitAPI/BukkitAPI"
import BWMUI from "../BWM-UI/BWM-UI"
import QDecorator from "./Q/QDecorator"

// ToDo добавить BukkitUI \/
export default angular.module("BWM",[BukkitAPI,BWMUI])
    .decorator("$q",QDecorator)
    .name
;

