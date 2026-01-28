"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeroService_1 = require("./services/HeroService");
const id = 8;
const hero = (0, HeroService_1.findheroeByID)(id);
console.log(hero);
console.log(hero?.name ?? `Hero no found with id: ${id}`);
//# sourceMappingURL=app.js.map