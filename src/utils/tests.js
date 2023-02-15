let prm = ["contenttypes.view_contenttype", "users.view_historicaluser", "users.view_user", "authtoken.view_token", "auth.view_permission", "auth.view_group", "sessions.view_session", "authtoken.view_tokenproxy"]

function getPermissions(routeName) {
  let arr = []
  if (prm.length > 0) {
    for (const iterator of prm) {
      let it = iterator.split('.')
      if (it[0] == routeName) {
        let view = it[1].split('_');
        if (view[0] == 'view' && view[1] == routeName.substring(0, routeName.length - 1)) {
          return true
        }
      }
    }
  }
  return false
};

let res = getPermissions('user');

console.log(res);
