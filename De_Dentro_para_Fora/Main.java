import java.io.IOException;
import java.util.Scanner;
 
public class Main {
 
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        sc.nextLine();
        for (int i = 0; i < N; i ++) {
            String frase = sc.nextLine();

            int tamanho = frase.length();
            int pontoMeio = tamanho / 2;

            String primeiraMetade = frase.substring(0, pontoMeio);
            String segundaMetade = frase.substring(pontoMeio);

            StringBuilder builder1 = new StringBuilder(primeiraMetade);
            String primeiraMetadeInvertida = builder1.reverse().toString();

            StringBuilder builder2 = new StringBuilder(segundaMetade);
            String segundaMetadeInvertida = builder2.reverse().toString();

            System.out.println(primeiraMetadeInvertida + segundaMetadeInvertida);

        }
        sc.close();
    }
}
