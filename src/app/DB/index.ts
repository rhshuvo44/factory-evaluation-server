import config from '../config'
import { USER_ROLE } from '../module/user/user.constant'
import { User } from '../module/user/user.model'

const superUser = {
  email: 'superAdmin@gmail.com',
  password: config.super_admin_password,
  name: 'Super Admin',
  username: 'superAdmin',
  role: USER_ROLE.superAdmin,
  phone: '12345974120',
}

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin })

  if (!isSuperAdminExits) {
    await User.create(superUser)
  }
}

export default seedSuperAdmin
