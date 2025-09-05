import java.io.IOException;
import java.util.Scanner;

public class Main {

    static int[] peso;
    static int[] preco;
    static int limitePeso;
    static int N;


    public static int encontrarMelhorCombinacao(int itemAtual, int pesoAtual, int valorAtual) {
        if (itemAtual == N) {
            return valorAtual;
        }


        int valorSemIncluir = encontrarMelhorCombinacao(itemAtual + 1, pesoAtual, valorAtual);


        int valorIncluindo = 0;
        if (pesoAtual + peso[itemAtual] <= limitePeso) {
            valorIncluindo = encontrarMelhorCombinacao(itemAtual + 1, pesoAtual + peso[itemAtual], valorAtual + preco[itemAtual]);
        }
        

        return Math.max(valorSemIncluir, valorIncluindo);
    }


    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);

        while (true) {
            N = sc.nextInt();

            if (N == 0) {
                break;
            }


            preco = new int[N];
            peso = new int[N];

            for (int i = 0; i < N; i++) {

                preco[i] = sc.nextInt();
                peso[i] = sc.nextInt();
            }

            limitePeso = sc.nextInt();

            int resultado = encontrarMelhorCombinacao(0, 0, 0);
            System.out.println(resultado);
        }

        sc.close();
    }
}