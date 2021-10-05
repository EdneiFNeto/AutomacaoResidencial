
#define led 13

int valor_lido;


void setup() {

  //Init serial
  Serial.begin(9600);

  //Init 
  pinMode(led, OUTPUT);
  
}

void loop() {

  //informar se existe dados para ser exibido
  if(Serial.available() > 0){
    valor_lido = Serial.read();
  }

  if(valor_lido == 50){
    digitalWrite(led, HIGH);
  } else if(valor_lido == 49){
    digitalWrite(led, LOW);
  }
  
  Serial.println((String)"valor: "+valor_lido);
  delay(300);
  
}