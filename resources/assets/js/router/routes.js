export default [
  ...applyRules(['guest'], [
    { path: '', component: require('$comp/auth/AuthWrapper'), redirect: { name: 'login' }, children:
      [
        { path: '/login', name: 'login', component: require('$comp/auth/login/Login') },
        { path: '/register', name: 'register', component: require('$comp/auth/register/Register') },
        { path: '/password', component: require('$comp/auth/password/PasswordWrapper'), children:
          [
            { path: '', name: 'forgot', component: require('$comp/auth/password/password-forgot/PasswordForgot') },
            { path: 'reset/:token', name: 'reset', component: require('$comp/auth/password/password-reset/PasswordReset') }
          ]
        }
      ]
    },
  ]),
  ...applyRules(['auth'], [
    { path: '', component: require('$comp/admin/AdminWrapper'), children:
      [
        { path: '', name: 'index', redirect: { name: 'profile' } },
        { path: 'profile', component: require('$comp/admin/profile/ProfileWrapper'), children:
          [
            { path: '', name: 'profile', component: require('$comp/admin/profile/Profile') },
            { path: 'edit', name: 'profile-edit', component: require('$comp/admin/profile/edit/ProfileEdit') }
          ]
        }
      ]
    },
  ]),
  { path: '*', redirect: { name: 'index' } }
]

function applyRules(rules, routes) {
  for (let i in routes) {
    routes[i].meta = routes[i].meta || {}

    if (!routes[i].meta.rules) {
      routes[i].meta.rules = []
    }
    routes[i].meta.rules.unshift(...rules)

    if (routes[i].children) {
      routes[i].children = applyRules(rules, routes[i].children)
    }
  }

  return routes
}
