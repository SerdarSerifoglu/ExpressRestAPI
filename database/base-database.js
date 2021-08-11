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
    return this.model.find();
  };

  insert = async (object) => {
    return await this.model.create(object);
  };

  removeBy = async (property, value) => {
    await this.model.deleteOne({ [property]: value });
  };

  update = async (id, object) => {
    return this.model.findByIdAndUpdate(id, object);
  };

  findBy(property, value) {
    return this.model.find({ [property]: value });
  }
}

module.exports = BaseDatabase;
