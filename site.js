import "/Users/ethan/Downloads/Fire/src/admin.js"
import "/Users/ethan/Downloads/Fire/src/index.js"
import "/Users/ethan/Downloads/Fire/src/teams.js"

import "/Users/ethan/Downloads/Fire/dist/bundle.js"
import "/Users/ethan/Downloads/Fire/dist/bundleTeams.js"
import "/Users/ethan/Downloads/Fire/admin/bundleAdmin.js"

window.updateAll = function() {
    updateAdmin();
    updateUsers();
    updateTeams();
    alert('a')
}