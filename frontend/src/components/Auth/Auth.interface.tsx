interface IUserResponse{
message: string,
token?: string,
details?:{
  email:[string]
}
}

export default IUserResponse;