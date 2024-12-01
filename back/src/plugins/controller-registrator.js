import { AdminRegistrator } from "../components/admin/registrator.js"
import { PublicProductRegistrator } from "../components/product/public/registrator.js"
import { ProductRegistrator } from "../components/product/registrator.js"
import { ReportRegistrator } from "../components/report/registratot.js"
import { SuperAdminRegistrator } from "../components/superadmin/registrator.js"
import { TransactionRegistrator } from "../components/transaction/registrator.js"
import { PublicUserRegistrator } from "../components/user/public/registrator.js"
import { UserRegistrator } from "../components/user/registrator.js"

export const ControllerRegistrator = (server, opts, done) => {
    server.register(UserRegistrator, { prefix: '/user' })
    server.register(PublicUserRegistrator, { prefix: '/user' })
    server.register(ProductRegistrator, { prefix: '/product' })
    server.register(PublicProductRegistrator, { prefix: '/product' })
    server.register(TransactionRegistrator, { prefix: '/transaction'})
    server.register(AdminRegistrator, { prefix: '/admin' })
    server.register(SuperAdminRegistrator, { prefix: '/superadmin' })
    server.register(ReportRegistrator, { prefix: '/report' })

    done()
}