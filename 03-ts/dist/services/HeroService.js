"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findheroeByID = void 0;
const heroes_1 = require("../data/heroes");
const findheroeByID = (id) => {
    return heroes_1.heroes.find(heroe => heroe.id === id);
};
exports.findheroeByID = findheroeByID;
//# sourceMappingURL=HeroService.js.map