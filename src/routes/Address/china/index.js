import {
  province
} from "./province";
import {
  city
} from "./city";
import {
  area
} from "./area";

let china = [];


province.map((p) => {
  let tmpP = {
    id: p.id,
    label: p.name,
    value: p.name
  };
  let three = true;

  if (city[p.id]) {
    if (!tmpP.children) tmpP.children = [];
    city[p.id].map((c) => {
      let tmpC = {
        id: c.id,
        label: c.name,
        value: c.name
      }

      if (area[c.id]) {
        tmpC.children = area[c.id].map((a) => {
          return {
            id: a.id,
            label: a.name,
            value: a.name
          }
        })
      } else {
        three = false;
      }

      tmpP.children.push(tmpC);
    })
  } else {
    three = false;
  }

  three && china.push(tmpP);
})

export default china;
