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
    assert.notDeepInclude(jsonObj.data, "invalidJson.txt", "Should not contain .txt file");
    assert.deepInclude(jsonObj.data, "organizations", "Should contain filename - organizations");
    assert.deepInclude(jsonObj.data, "tickets", "Should contain filename - tickets");
    assert.deepInclude(jsonObj.data, "users", "Should contain filename - users");
  });

})