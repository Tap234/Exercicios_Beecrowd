import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Queue;
import java.util.LinkedList;

public class Main {

    /**
     * O método main é responsável por ler a entrada, montar o grafo e orquestrar a solução.
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. LEITURA DOS DADOS E CONSTRUÇÃO DO GRAFO
        
        // Lê a primeira linha (não usaremos o número de pontos, mas precisamos ler para avançar)
        int numPontos = scanner.nextInt();
        int numLigacoes = scanner.nextInt();

        // A Lista de Adjacência: a melhor forma de representar nosso labirinto (grafo).
        // A chave é um Ponto (String), e o valor é uma Lista de todos os seus vizinhos.
        Map<String, List<String>> grafo = new HashMap<>();

        // Loop para ler todas as ligações e popular o nosso grafo
        for (int i = 0; i < numLigacoes; i++) {
            String pontoA = scanner.next();
            String pontoB = scanner.next();

            // Garante que existe uma lista de vizinhos para o pontoA antes de adicionar.
            grafo.putIfAbsent(pontoA, new ArrayList<>());
            // Adiciona o pontoB como vizinho do pontoA.
            grafo.get(pontoA).add(pontoB);

            // Faz o mesmo para o pontoB, já que as ligações são de mão dupla.
            grafo.putIfAbsent(pontoB, new ArrayList<>());
            grafo.get(pontoB).add(pontoA);
        }

        // 2. RESOLUÇÃO DO PROBLEMA
        
        // Passo 1: Calcular a menor distância da "Entrada" até o queijo "*".
        int distEntradaAteQueijo = bfs("Entrada", "*", grafo);
        
        // Passo 2: Calcular a menor distância do queijo "*" até a "Saida".
        int distQueijoAteSaida = bfs("*", "Saida", grafo);

        // A resposta final é a soma das duas distâncias.
        System.out.println(distEntradaAteQueijo + distQueijoAteSaida);

        scanner.close();
    }

    /**
     * Função que implementa a Busca em Largura (BFS) para encontrar o caminho mais curto.
     * @param inicio O ponto de partida.
     * @param fim O ponto de destino.
     * @param grafo O mapa que representa o labirinto.
     * @return A menor distância (em número de "passos") entre o início e o fim.
     */
    public static int bfs(String inicio, String fim, Map<String, List<String>> grafo) {
        // Fila: armazena os próximos pontos a serem visitados.
        Queue<String> fila = new LinkedList<>();
        
        // Mapa de Distâncias: guarda a menor distância do 'inicio' até cada ponto visitado.
        // Também serve para marcar os pontos que já foram visitados.
        Map<String, Integer> distancias = new HashMap<>();

        // Inicialização: adicionamos o ponto de partida na fila e no mapa de distâncias.
        fila.add(inicio);
        distancias.put(inicio, 0);

        // O loop principal da BFS: continua enquanto houver pontos na fila para visitar.
        while (!fila.isEmpty()) {
            // Pega o próximo ponto da fila para explorar.
            String atual = fila.poll();

            // Se o ponto atual é o nosso destino, encontramos o caminho mais curto!
            if (atual.equals(fim)) {
                return distancias.get(atual); // Retorna a distância acumulada.
            }

            // Se o ponto atual não tem vizinhos (não está no mapa), pulamos.
            if (!grafo.containsKey(atual)) {
                continue;
            }

            // Para cada vizinho do ponto atual...
            for (String vizinho : grafo.get(atual)) {
                // ...verificamos se ele já foi visitado.
                if (!distancias.containsKey(vizinho)) {
                    // Se não foi, marcamos como visitado e calculamos sua distância.
                    distancias.put(vizinho, distancias.get(atual) + 1);
                    // Adicionamos o vizinho na fila para que seus vizinhos sejam explorados depois.
                    fila.add(vizinho);
                }
            }
        }
        
        // Se o loop terminar e não encontrarmos o 'fim', significa que não há caminho.
        return -1; // Ou lançar uma exceção, dependendo do problema.
    }
}