class XMLParser {
  constructor() {
    this.ParsedAttributeSection = null;
    this.ParsedCgiSection = null;
    this.AttributeSectionXML = null;
    this.CgiSectionXML = null;
    this.domParser = new DOMParser();
  }

  stringToJsonCGIs = result => {
    if (result === null) {
      return undefined;
    }

    let dataType;
    let oValue;
    const dataTypeNode = result.getElementsByTagName('dataType')[0].childNodes[0];
    if (typeof dataTypeNode !== 'undefined') {
      dataType = dataTypeNode.nodeName;
    }
    if (dataType === 'string') {
      oValue = {};

      if (dataTypeNode.getAttribute('minlen') !== null) {
        oValue.minLength = dataTypeNode.getAttribute('minlen');
      }

      if (dataTypeNode.getAttribute('maxlen') !== null) {
        oValue.maxLength = dataTypeNode.getAttribute('maxlen');
      }
    } else if (dataType === 'int' || dataType === 'float') {
      oValue = {};

      if (dataTypeNode.getAttribute('min') !== null) {
        if (dataType === 'float') {
          oValue.minValue = parseFloat(dataTypeNode.getAttribute('min'));
        } else {
          oValue.minValue = parseInt(dataTypeNode.getAttribute('min'), 10);
        }
      }

      if (dataTypeNode.getAttribute('max') !== null) {
        if (dataType === 'float') {
          oValue.maxValue = parseFloat(dataTypeNode.getAttribute('max'));
        } else {
          oValue.maxValue = parseInt(dataTypeNode.getAttribute('max'), 10);
        }
      }
    } else if (dataType === 'enum' || dataType === 'csv') {
      oValue = [];
      const entries = result.getElementsByTagName('entry');
      const { length } = entries;
      for (let i = 0; i < length; i += 1) {
        const entry = entries[i];
        oValue.push(entry.getAttribute('value'));
      }
    } else if (dataType === 'bool') {
      oValue = {};
      oValue = true;
    }
    return oValue;
  }

  /*
    iXML : Output From http://<ip>/stw-cgi/attributes.cgi/cgis
    inputStr : cginame/submenu/parameter/datatype
    Usage: XMLParser.parseCgiSection(iXML,inputStr);
    */
  parseCgiSection = (iXML, inputStr) => {
    let xmlData = null;
    let result = null;
    if (typeof this.CgiSectionXML === 'undefined' || this.CgiSectionXML !== iXML) {
      this.CgiSectionXML = iXML;
      xmlData = this.domParser.parseFromString(iXML, 'application/xml');
      this.ParsedCgiSection = this.domParser.parseFromString(iXML, 'application/xml');
    } else {
      xmlData = this.ParsedCgiSection;
    }

    const token = inputStr.split('/');

    let [cgiName, submenuName, actionName, parameterName] = [];
    if (token.length === 5) { // cginame/submenu/action/parameter/datatype
      [cgiName, submenuName, actionName, parameterName] = token;
    } else if (token.length === 4) { // cginame/submenu/parameter/datatype
      [cgiName, submenuName, parameterName] = token;
    } else if (token.length === 3) { // submenu/parameter/datatype
      [submenuName, parameterName] = token;
    } else if (token.length === 2) { // parameter/datatype
      [parameterName] = token;
    } else { // cannot Found: return 'undefined'
      return undefined;
    }
    if (cgiName) {
      const cgis = xmlData.getElementsByTagName('cgi');
      const findResult = this.findAttribute(cgis, cgiName);
      if (findResult !== null) {
        result = findResult;
      }
    }

    if (submenuName && result !== null) {
      const submenus = result.getElementsByTagName('submenu');
      const findResult = this.findAttribute(submenus, submenuName);
      if (findResult !== null) {
        result = findResult;
      }
    }

    if (actionName && result !== null) {
      const actions = result.getElementsByTagName('action');
      const findResult = this.findAttribute(actions, actionName);
      if (findResult !== null) {
        result = findResult;
      }
    }

    if (parameterName && result !== null) {
      const parameters = result.getElementsByTagName('parameter');
      const findResult = this.findAttribute(parameters, parameterName);
      if (findResult !== null) {
        result = findResult;
      }
    }

    return this.stringToJsonCGIs(result);
  }

  findAttribute = (dataArray, key) => {
    const { length } = dataArray;
    for (let i = 0; i < length; i += 1) {
      const parameter = dataArray[i];
      const strData = parameter.getAttribute('name');
      if (strData === key) {
        return parameter;
      }
    }
    return null;
  }

  findAttributes = (dataArray, key) => {
    const { length } = dataArray;
    const attributes = {};
    for (let i = 0; i < length; i += 1) {
      const parameter = dataArray[i];
      const strData = parameter.getAttribute('name');
      const strDataObjecName = strData.split('.');

      if (key === undefined || key.includes(strDataObjecName[0])) {
        const convertAttributeData = this.stringToJsonAttributes(parameter);
        if (strDataObjecName.length === 2) {
          attributes[strDataObjecName[0]] = {
            ...attributes[strDataObjecName[0]],
            [strDataObjecName[1]]: convertAttributeData,
          };
        } else {
          attributes[strDataObjecName[0]] = convertAttributeData;
        }
      }
    }

    return attributes;
  }

  stringToJsonAttributes = result => {
    let oValue;
    const dataType = result.getAttribute('type');
    const iValue = result.getAttribute('value');

    if (dataType === 'bool') {
      if (iValue === 'True') {
        oValue = true;
      } else {
        oValue = false;
      }
    } else if (dataType === 'int') {
      oValue = parseInt(iValue, 10);
    } else if (dataType === 'enum' || dataType === 'csv') {
      const toSplit = iValue.split(',');

      oValue = [];
      for (let i = 0; i < toSplit.length; i += 1) {
        oValue.push(toSplit[i]);
      }
    }

    return oValue;
  }

  parseAttributeSectionByChannel = (iXML, inputStr, maxChannel) => {
    let xmlData = null;
    const result = Array(maxChannel);
    if (typeof this.AttributeSectionXML === 'undefined' || this.AttributeSectionXML !== iXML) {
      this.AttributeSectionXML = iXML;
      xmlData = this.domParser.parseFromString(iXML, 'application/xml');
      this.ParsedAttributeSection = this.domParser.parseFromString(iXML, 'application/xml');
    } else {
      xmlData = this.ParsedAttributeSection;
    }

    const array = inputStr.split('/');
    const targetIndex = array.length - 1;
    const groupName = array[0];
    const categoryName = array[1];
    const attrName = array[targetIndex];

    const groups = xmlData.getElementsByTagName('group');
    const group = this.findAttribute(groups, groupName);
    if (group !== null) {
      const categories = group.getElementsByTagName('category');
      const category = this.findAttribute(categories, categoryName);
      if (category !== null) {
        const channels = category.getElementsByTagName('channel');
        const attributes = category.getElementsByTagName('attribute');
        if (channels.length === 0) {
          const attribute = this.findAttribute(attributes, attrName);
          if (attribute !== null) {
            result[0] = this.stringToJsonAttributes(attribute);
          }
        } else {
          const { length } = channels;
          for (let i = 0; i < length; i += 1) {
            const channel = channels[i];
            const channelId = parseInt(channel.getAttribute('number'), 10);
            const chAttribute = channel.getElementsByTagName('attribute');
            const attribute = this.findAttribute(chAttribute, attrName);
            if (attribute !== null) {
              result[channelId] = this.stringToJsonAttributes(attribute);
            }
          }
        }
      }
    }

    return result;
  }

  /*
    iXML : http://<ip>/stw-cgi/attributes.cgi/attributes
    inputStr : groupName/categoryName/attributeName
    Usage: XMLParser.parseAttributeSection(iXML,inputStr)
    */
  parseAttributeSection = (iXML, inputStr) => {
    let xmlData;
    if (typeof this.AttributeSectionXML === 'undefined' || this.AttributeSectionXML !== iXML) {
      this.AttributeSectionXML = iXML;

      xmlData = this.domParser.parseFromString(iXML, 'application/xml');
      this.ParsedAttributeSection = xmlData;
    } else {
      xmlData = this.ParsedAttributeSection;
    }

    let oValue;
    const array = inputStr.split('/');
    if (array.length === 3) { // groupName/categoryName/attributeName
      const groups = xmlData.getElementsByTagName('group');
      const group = this.findAttribute(groups, array[0]);
      if (group !== null) {
        const categories = group.getElementsByTagName('category');
        const category = this.findAttribute(categories, array[1]);
        if (category !== null) {
          const attributes = category.getElementsByTagName('attribute');
          const attribute = this.findAttribute(attributes, array[2]);
          if (attribute !== null) {
            oValue = this.stringToJsonAttributes(attribute);
            return oValue;
          }
        }
      }
    } else if (array.length === 2) { // categoryName/attributeName
      const categories = xmlData.getElementsByTagName('category');
      const category = this.findAttribute(categories, array[0]);
      if (category !== null) {
        const attributes = category.getElementsByTagName('attribute'); // 확인 'currCategory' is not defined
        const attribute = this.findAttribute(attributes, array[1]);
        if (attribute !== null) {
          oValue = this.stringToJsonAttributes(attribute);
          return oValue;
        }
      }
    } else if (array.length === 1) { // attributeName
      const attributes = xmlData.getElementsByTagName('attribute');
      const attribute = this.findAttribute(attributes, array[1]);
      if (attribute !== null) {
        oValue = this.stringToJsonAttributes(attribute);
        return oValue;
      }
    }

    return oValue;
  }

  /*
    iXML : http://<ip>/stw-cgi/attributes.cgi/attributes/groupname/category
    inputStr : find attributeName
    Usage: XMLParser.parseAttributeGroupInsideSection(iXML,inputStr)
    condition: have channel (media, image, eventssource, ptz, recording)
  */
  parseAttributeGroupInsideSection = (iXML, findAttributeName) => new Promise(resolve => {
    let xmlData;
    if (typeof this.AttributeSectionXML === 'undefined' || this.AttributeSectionXML !== iXML) {
      this.AttributeSectionXML = iXML;

      xmlData = this.domParser.parseFromString(iXML, 'application/xml');
      this.ParsedAttributeSection = xmlData;
    } else {
      xmlData = this.ParsedAttributeSection;
    }

    const channels = xmlData.getElementsByTagName('category')[0].getElementsByTagName('channel');
    const result = [];
    const { length } = channels;

    for (let i = 0; i < length; i += 1) {
      const channel = channels[i];
      const chAttribute = channel.getElementsByTagName('attribute');
      const attribute = this.findAttributes(chAttribute, findAttributeName);
      result.push(attribute);
    }

    resolve(result);
  });

  // 추후에 통합해보는걸로....
  // generatorDom = dom => {
  //   if (dom.children.length !== 0) {
  //     this.generatorDom(dom.children);
  //   }
  //   const convertDomObject = this.convertDomDataToObject(dom);

  // }

  // convertDomChildren = dom => {
  //   const childrenCount = dom.children.length;
  //   const childrenObjectList = [];

  //   for(let i = 0; i < childrenCount; i++) {
  //     childrenObjectList.push(this.convertDomDataToObject(dom.children[i]));
  //   }

  //   return childrenObjectList;
  // }

  // convertDomDataToObject = dom => {
  // const attributeNames = dom.getAttributeNames();
  // const isAttribute = dom.tagName === 'attribute';
  // switch(dom.tagName) {
  //   case 'group':
  //   break;
  //   case 'category':
  //   break;
  //   case 'attribute':
  //   break;
  //   default:
  //   break;
  // }
  // const convertObject = attributeNames.map(attributeName => {

  //   if (isAttribute) {
  //     return {
  //       [attributeNames[0]]: this.stringToJsonAttributes(dom)
  //     };
  //   }
  //   return {
  //     [attributeNames[0]]: {
  //       [attributeName]: dom.getAttribute(attributeName)
  //     }
  //   };
  // });
  // return
  // }
}

export default new XMLParser();
