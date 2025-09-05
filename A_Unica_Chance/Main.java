import java.io.IOException;
import java.util.Scanner;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
 
public class Main {
 
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        for (int i = 0; i < N; i ++) {
            int A = sc.nextInt();
            String B = sc.next();

            char[] letras = B.toCharArray();

            char[] ordenadas = B.toCharArray();
            Arrays.sort(ordenadas);

            List<Integer> posicoes = new ArrayList<>();
            for (int a = 0; a < A; a++) {
                if (letras[a] != ordenadas[a]) posicoes.add(a);
            }

            if (posicoes.size() > 2) {
                System.out.println("There aren't the chance.");
            } else {
                System.out.println("There are the chance.");
            }

        }
        sc.close();
    }
 
}