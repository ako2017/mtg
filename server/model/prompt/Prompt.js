class Prompt  {
	constructor(msg, validator) {
        this.msg = msg;
		this.validator = validator;
	}
	
	*execute() {
        do {
            console.log(this.msg);
            var result = yield {prompt:true,msg:this.msg};
        } while(!this.validator(result));
        return result;
	}
}