import jwt from 'jsonwebtoken';

class GenerateJwtToken{
    static generate(id:number, body:any){
        const token = jwt.sign({id: id}, body.key, {
            expiresIn: 86400
        });
    
        return token;
    }
}
export default GenerateJwtToken;