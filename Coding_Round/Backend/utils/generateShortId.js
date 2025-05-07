import shortid from "shortid";

function generateShortId() {
  return shortid.generate();
}

export default generateShortId;