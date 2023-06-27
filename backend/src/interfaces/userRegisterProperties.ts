import userProperties from "./userProperties";

type userCreationProperties = Omit<userProperties, 'id'>;

export default userCreationProperties