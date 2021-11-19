
#include "EmonLib.h";
int voltage = 127;
int pinSCT = A1;
EnergyMonitor SCT013;
int potency;
char json;
double Irms;

void setup() {
  Serial.begin(9600);
  SCT013.current(pinSCT, 60.607);
}


void loop() {

  Irms = SCT013.calcIrms(1480);  
  potency = Irms * voltage; 

  Serial.print("{ \"irms\": ");
  Serial.print((String)+Irms+", ");

  Serial.print("\"potency\": ");
  Serial.print((String)+potency+", ");

  
  Serial.print("\"voltage\": ");
  Serial.print((String)+voltage);
  
  Serial.println(" }");

  
  delay(3000);
  
}
