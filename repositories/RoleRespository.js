import Role from "../models/entities/Role.js";

class RoleRepository {
    async checkName(name) {
        const role = await Role.findOne({
            where: {
                name,
            },
        });
        console.log(role == null);
        return role == null;
    }
}
export default new RoleRepository();
