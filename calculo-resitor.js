

// Led Vermelho (2V) corrente 20mA
// Fonte do arduino 5V

//R = tensao de vcc - tensao do led / corrente do led

//converte mA para A = 20mA /10000 => 0,02A

//R = (5v - 2V) / 0,02A => 3V / 0,02A => 150Oms

//Potencia  => p = V.I => (5v - 2V) * 0,02A => 0,06W

//========================== Ligar um led branco ========================

//Led (positivow)
//Corrente do LED(Branco) 3,2V
//R = (5 - 3,2) / 0,02A = 90A

//================== Restores ==================================================


//Verde,    Azul,       Marron  => 56   x   (10Ω)   =>  560Ω
//Vermelho, Vermelho,   Marron  => 22   x   (10Ω)   =>  220Ω
//Marron,   Verde,      Marron  => 15   x   (10Ω)   =>  150Ω
//Amarelo,  Violeta,    Preto   => 47   x   (1Ω)    =>  47Ω
//Laranja,  Laranja,    Preto   => 33   x   (1Ω)    =>  33Ω
//Marron,   Preto,      Preto   => 10   x   (1Ω)    =>  10Ω


//================== Componentes do Circuito ===================================

//Laranja,  Laranja,    Preto     => 33   x   (1Ω)    =>  33Ω
//Marron,   Preto,      Laranja   => 10   x   (1Ω)    =>  10kΩ

//================== Capacitores ===================================
 //Armazena carga eletrica

//================== Calculo de4 resitor ===================================
// R(carga) = Tensao / corrente => 2,5 / 0,0707A = 35oms

//Valor de calibracao
// numeros de espiras = N2
//VC = N2(N° espiras) / R(Carga) => 2000 / 33 => 60.606

