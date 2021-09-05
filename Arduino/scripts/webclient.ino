#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {
  0xDe, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};


// IP local da mauina
IPAddress ip(192,168,0,0);

//Porta default
EthernetServer server(80);

int pinLed1 = 3;
int led   = 0;

void setup() {
    Serial.begin(9600);
    while (!Serial){
      ;
    }

    if(digitalRead(pinLed1) == HIGH) 
      led = 1;
    else if(digitalRead(pinLed1) == LOW) 
      led = 0;

    pinMode(pinLed1, OUTPUT);
    digitalWrite(pinLed1, LOW);

    Ethernet.begin(mac,ip);
    server.begin();
    Serial.print("Server is at ");
    Serial.println(Ethernet.localIP());
}

void loop() {

    EthernetClient client = server.available();
    
    if(client){
  
      Serial.println("New client");
      boolean currentLineIsBlank = true;
      String DatEth;
      String msg = "LED DESLIGADO";

      while (client.connected()){

          if(client.available()){

            char c = client.read();
            Serial.write(c);
            DatEth.concat(c);
            
            if(DatEth.endsWith("/ledon")) {
              led = 1; 
              msg = "LED LIGADO";
              Serial.println(msg);
            }

            if(DatEth.endsWith("/ledof")) {
              led = 0; 
              msg = "LED DESLIGADO";
              Serial.println(msg);
            }

            if(c == '\n' && currentLineIsBlank){
                
                //============================================================
                //CODIGO HTML
                //============================================================
                
                client.println("<!DOCTYPE html>");
                client.println("<html lang=\"pt-br\">");
                client.println("<head>");
                client.println("<title>Modulo Ethernet Arduino</title>");
                client.println("<meta http-equiv=\"refresh\" content=\"2\" charset=\"UTF-8\">");
                client.println("</head>");
                client.println("<body style=\"background-color: #DDD;\">");
                client.println("<br>");
                client.println("<form align=\"center\">");
                client.println("<label style=\"font-size: 18pt;\">"+msg+"</label>");
                client.println("<br>");
                client.println("<br>");
                client.println("<button type=\"submit\" formaction=\"ledon\">Ligar</button>");//Button HTML5
                client.println("<button type=\"submit\" formaction=\"ledof\">Desligar</button>");//Button HTML5
                client.println("</form>");
                client.println("<br>");
                client.println("</body>");
                client.println("</html>");
                
                //============================================================
                //ASCENDE LED & LIGA LED
                //============================================================
                
                if(led == 1){
                  digitalWrite(pinLed1, HIGH);
                }

                if(led == 0){
                  digitalWrite(pinLed1, LOW);
                }

                break;
            }

            if(c == '\n') {
                currentLineIsBlank = true;
            }

            else if (c != '\r') {
                currentLineIsBlank = false;
            }
        }
      }

      delay(1);
      client.stop();
      Serial.println("Client disconnected");
    }
}
