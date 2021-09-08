function esPrioritario(dato)
{
    console.log(dato);
    var arrayDato = dato.split("-"); //SEPARO EL DATO POR EL -
    console.log("DATOOOOO " + arrayDato);
    //COMPRUEBO QUE EL CÓDIGO ALFABÉTICO DEL PRODUCTO TENGA UNA LONGITUD IGUAL A 3 Y ES ALFABÉTICO
    if(arrayDato[0].length == 3 && arrayDato[0].match(/^[a-zA-Z]+$/)){
        //COMPRUEBO QUE EL CÓGIGO DE PRODUCTO COMIENCE CON LAS LETRAS P O W
        if(arrayDato[0].charAt(0).includes('P') || arrayDato[0].charAt(0).includes('p') || arrayDato[0].charAt(0).includes('W') || arrayDato[0].charAt(0).includes('w')){
            return true;
        }
    }
    return false;
}

function verificar(dato)
{
    var arrayDato = dato.split("-"); //SEPARO EL DATO POR EL -
    //COMPRUEBO QUE EL CÓDIGO DE LA REGIÓN GEOGRÁFICA TENGA UNA LONGITUD IGUAL A 5 Y ES NUMÉRICO
    if(arrayDato[1].length == 5 && arrayDato[1].match(/^[0-9]+$/)){
        //CONVIERTO EL STRING DEL CÓDIGO DE LA REGIÓN GEOGRÁFICA EN UN ARRAY PARA CALCULAR EL DÍGITO VERIFICADOR CORRECTO
        var arr = arrayDato[1].split('');
        var digitoVerificadorCorrecto = 0;
        arr.forEach(elemento => digitoVerificadorCorrecto += parseInt(elemento));
        //SI OBTENGO UN NÚMERO DE 2 DÍGITOS, VUELVO A SUMAR
        if(digitoVerificadorCorrecto % 10 >= 0){
            console.log(digitoVerificadorCorrecto % 10);
            var digitos = digitoVerificadorCorrecto.toString().split('');
            digitoVerificadorCorrecto = 0;
            digitos.forEach(digito => digitoVerificadorCorrecto += parseInt(digito));
        }
        //COMPRUEBO SI DATO ES IGUAL A EL CÓDIGO VERIFICADOR CORRECTO
        if(arrayDato[2] == digitoVerificadorCorrecto){
            return true;
        }
    }
    return false;
}
 
exports.esPrioritario = esPrioritario;
exports.verificar = verificar;