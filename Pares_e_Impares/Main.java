import java.io.IOException;
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
 
public class Main {
 
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();

        List<Integer> pares = new ArrayList<>();
        List<Integer> impares = new ArrayList<>();

        int Quantidade_Pares = 0;
        int Quantidade_Impares = 0;

        for (int i = 0; i < N; i ++) {
            int Numero = sc.nextInt();
            if (Numero % 2 == 0) {
                pares.add(Numero);
                Quantidade_Pares++;
            } else {
                impares.add(Numero);
                Quantidade_Impares++;
            }
        }

        Collections.sort(pares);
        Collections.sort(impares, Collections.reverseOrder());

        for (int i = 0; i < Quantidade_Pares; i++) {
            System.out.println(pares.get(i));
        }
        for (int i = 0; i < Quantidade_Impares; i++) {
            System.out.println(impares.get(i));
        }

        sc.close();
    }
 
}