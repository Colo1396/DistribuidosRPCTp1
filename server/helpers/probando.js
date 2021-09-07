var verificaciones=require('./verificaciones');

console.log('Código DCR-88578-9 es prioritario? '+verificaciones.esPrioritario("DCR-88578-9"));
console.log('Código PCR-88578-9 es prioritario? '+verificaciones.esPrioritario("PCR-88578-9"));
console.log('Código WCR-88578-9 es prioritario? '+verificaciones.esPrioritario("WCR-88578-9"));

console.log('Código DCR-88578-9 tiene dígito verificador correcto? '+verificaciones.verificar("DCR-88578-9"));
console.log('Código DCR-88578-7 tiene dígito verificador correcto? '+verificaciones.verificar("DCR-88578-7"));