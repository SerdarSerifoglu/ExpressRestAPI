const fs = require("fs");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name;
  }

  save = (objects) => {
    fs.writeFileSync(`./${this.filename}.json`, JSON.stringify(objects, null, 2));
  };

  load = () => {
    const file = fs.readFileSync(`./${this.filename}.json`, "utf8");
    const objects = JSON.parse(file);
    return objects.map(this.model.create);
  };

  insert = (object) => {
    const objects = this.load();

    /* requestlerden gelen objelerin tipi belli olmadığından bu şekilde genel bir ek yaptık base-database'i kullanan
    modele göre obje oluşturuyor */
    if (!(object instanceof this.model)) {
      object = this.model.create(object);
    }

    this.save(objects.concat(object));
    return object;
  };

  remove = (index) => {
    const objects = this.load();
    objects.splice(index, 1);
    this.save(objects);
  };

  removeBy = (property, value) => {
    const objects = this.load();

    const index = objects.findIndex((o) => o[property] === value);
    if (index === -1) throw new Error(`Cannot find ${this.model.name}`);

    objects.splice(index, 1);
    this.save(objects);
  };

  update = (object) => {
    const objects = this.load();
    const index = objects.findIndex((o) => o.id === object.id);

    if (index === -1) throw new Error(`Cannot find ${this.model.name} instance with id ${object.id}`);

    objects.splice(index, 1, object);
    this.save(objects);
  };

  findBy(property, value) {
    return this.load().find((o) => o[property] === value);
  }
}

module.exports = BaseDatabase;
