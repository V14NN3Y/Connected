#define lampe 8

void setup() 
{
  pinMode(lampe,OUTPUT);
  Serial.begin(9600);
}

void loop() 
{
 String commande = Serial.readStringUntil('\n');
 if(commande == "ON")
 {
   digitalWrite(lampe, HIGH);
    Serial.println(commande);
 }
 else if (commande == "OFF")
 {
  digitalWrite(lampe,LOW);
  Serial.println(commande);
 }
}
