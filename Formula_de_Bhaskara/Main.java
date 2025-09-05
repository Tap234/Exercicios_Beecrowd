import java.io.IOException;
import java.util.Scanner;
 
public class Main {
 
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);

        double A = sc.nextDouble();
        double B = sc.nextDouble();
        double C = sc.nextDouble();

        double Delta = ((Math.pow(B, 2)) - (4* A* C));

        if (A == 0.0 || Delta < 0.0) { 
            System.out.println("Impossivel calcular");
            sc.close();
            return;
        }

        double Raiz_Positiva = ((-B) + (Math.sqrt(Delta))) / (2 * A);
        double Raiz_Negativa = ((-B) - (Math.sqrt(Delta))) / (2 * A);

        System.out.printf("R1 = %.5f%n", Raiz_Positiva);
        System.out.printf("R2 = %.5f%n", Raiz_Negativa);

        sc.close();
    }
 
}