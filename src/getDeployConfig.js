import fs from 'fs-extra';
import { DEPLPOY_FILE_NAME } from './config'


export default () => {
  let json;
  try {
    json = fs.readJsonSync(DEPLPOY_FILE_NAME)
  } catch (e) {}
  return json;
}
