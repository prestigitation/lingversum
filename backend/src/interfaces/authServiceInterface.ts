export default interface authServiceInterface {
    jwt: any;
    dotenv: any;
    generateToken(info: object): string;
    matchHash(rawString: string, hashedString: string): boolean;
}