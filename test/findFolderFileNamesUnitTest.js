const chai = require("chai");
var assert = chai.assert;
const expect = chai.expect;
var findFolderFileName = require("../server/services/findFolderFileNames");
const chaiAsPromised = require("chai-as-promised");
const config = require("../config/config")
chai.use(chaiAsPromised);

describe('Finding Json File Names Service', function () {
  
  it('should only return files with .json extension in folder', async function () {
    var jsonObj = await findFolderFileName.findNames(config.mockDataFolderPath);
    assert.lengthOf(jsonObj.data, 3, "Should only contain 3 files");
    assert.notInclude(jsonObj.data, "invalidJson.txt", "Should not contain .txt file")
  });

})