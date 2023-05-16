# gomoku-test

```bash
cd ws
cd gomoku
mkdir domain
mkdir util
mkdir \_\_test\_\_
touch ./\_\_test\_\_/gomoku_test.js
touch ./util/error_messages.js
touch ./util/test_util.js
touch ./domain/gomoku.js
```

## gomoku_test.js

```js
/**
 * @group unit
 */

const gomokuHandler = require('../domain/gomoku.js');
const ERR_MSGS = require('../util/error_messages.js');
const testUtil = require('../util/test_util.js');

```

