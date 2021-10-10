const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = `Seja bem vindo a calculadora de IMC`;
});

(async function() {
	router.get('/imc', async ctx => {

		let {url} = ctx;
		let queryString = url.split('?');
        let ulrParams = new URLSearchParams(queryString.pop())
        let altura = ulrParams.get('altura')
        let peso = ulrParams.get('peso')
		try {
			ctx.status = 200;
			ctx.body = {
				imc: imc = await resolveImc(peso, altura)
			}
		} catch (e) {
			console.error(e);

		}
	})
})()

function resolveImc(peso, altura) {
    return new Promise((resolve, reject) => {
        let calc = peso/(altura*altura).toFixed(1);
        let imc = calc.toFixed(1)
        let imcResult
        if(!altura||!peso){
            resolve('Peso ou altura não definidos')
        }
        switch (true) {
        case (imc < 18.5):
           imcResult =`Imc: ${imc}, índice de massa corporal Baixo`
           break
        case (imc >= 18.5 && imc < 24.9):
            imcResult = `Imc: ${imc}, índice de massa corporal Normal`
            break
        case imc >=25 && imc <29.9:
            imcResult = `Imc: ${imc}, Sobrepeso`
            break
        case imc >=30 && imc <34.9:
            imcResult = `Imc: ${imc}, Obesidade classe 1`
            break
        case imc >=35 && imc <39.9:
            imcResult = `Imc: ${imc}, Obesidade classe 2`
            break
        case imc >=40:
            imcResult = `Imc: ${imc}, Obesidade classe 3`
            break
        }
        resolve(imcResult)
    })
}

module.exports = router;
