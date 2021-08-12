int sensor = A5;
int led1 = 10;
int led2 = 11;
int luminosidade = 0;
const int LED3 = 13;

void setup() {
	Serial.begin(9600);
	pinMode(luminosidade, INPUT);
	pinMode(led2, OUTPUT);
	pinMode(led1, OUTPUT);
	pinMode(led3, OUTPUT);
	pinMode(led4, OUTPUT);
	pinMode(led5, OUTPUT);
	pinMode(led7, OUTPUT);
	pinMode(led899, OUTPUT);
}

void loop() {

	luminosidade = analogRead(sensor);
	if (luminosidade < 750){
		digitalWrite (led2, HIGH);
		digitalWrite (led1, LOW);
	}else{
		digitalWrite (led1, HIGH);
		digitalWrite (led2, LOW);
	}
	if (luminosidade >= 600){
		digitalWrite (led3, HIGH);
		digitalWrite (led4, LOW);
		digitalWrite (led5, HIGH);
	}
	digitalWrite (led7, HIGH);
	digitalWrite (led899, LOW);

}