package name.webdizz.performance.testing.patient.mock.server;

import static java.lang.System.out;
import static com.github.tomakehurst.wiremock.WireMockServer.FILES_ROOT;
import static com.github.tomakehurst.wiremock.WireMockServer.MAPPINGS_ROOT;
import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.matching;
import static com.github.tomakehurst.wiremock.client.WireMock.post;
import static com.github.tomakehurst.wiremock.client.WireMock.urlPathMatching;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.common.FatalStartupException;
import com.github.tomakehurst.wiremock.common.FileSource;
import com.github.tomakehurst.wiremock.standalone.CommandLineOptions;
import com.github.tomakehurst.wiremock.stubbing.StubMapping;

public class PatientApiServer {
    private static final String BANNER = "______    _         ______     _   _            _     _____                          \n" +
            "|  ___|  | |        | ___ \\   | | (_)          | |   /  ___|                         \n" +
            "| |_ __ _| | _____  | |_/ /_ _| |_ _  ___ _ __ | |_  \\ `--.  ___ _ ____   _____ _ __ \n" +
            "|  _/ _` | |/ / _ \\ |  __/ _` | __| |/ _ \\ '_ \\| __|  `--. \\/ _ \\ '__\\ \\ / / _ \\ '__|\n" +
            "| || (_| |   <  __/ | | | (_| | |_| |  __/ | | | |_  /\\__/ /  __/ |   \\ V /  __/ |   \n" +
            "\\_| \\__,_|_|\\_\\___| \\_|  \\__,_|\\__|_|\\___|_| |_|\\__| \\____/ \\___|_|    \\_/ \\___|_|   \n" +
            "                                                                                     \n" +
            "                                                                                     ";

    public static void main(final String[] args) {
        new PatientApiServer().run(args);
    }

    private void run(String... args) {

        String[] argsWithExtensions = applyExtensions(args);
        CommandLineOptions options = new CommandLineOptions(argsWithExtensions);
        if (options.help()) {
            out.println(options.helpText());
            return;
        }

        FileSource fileSource = options.filesRoot();
        fileSource.createIfNecessary();
        FileSource filesFileSource = fileSource.child(FILES_ROOT);
        filesFileSource.createIfNecessary();
        FileSource mappingsFileSource = fileSource.child(MAPPINGS_ROOT);
        mappingsFileSource.createIfNecessary();


        WireMockServer wireMockServer = new WireMockServer(options);
        if (options.recordMappingsEnabled()) {
            wireMockServer.enableRecordMappings(mappingsFileSource, filesFileSource);
        }
        wireMockServer.setGlobalFixedDelay(50);

        try {
            wireMockServer.start();
            out.println(BANNER);
            out.println();
            out.println(options);
            addMappings(wireMockServer);

            out.println("Mock server contains next mappings:");
            for (StubMapping mapping : wireMockServer.listAllStubMappings().getMappings()) {
                out.println(mapping.toString());
            }

        } catch (FatalStartupException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    private String[] applyExtensions(final String[] args) {
        List<String> arguments = new ArrayList<>(Arrays.asList(args));
        arguments.add("--port");
        arguments.add("8081");
        arguments.add("--extensions");
        arguments.add(PatientResponseTransformer.class.getCanonicalName());
        String[] argsWithExtensions = new String[arguments.size()];
        arguments.toArray(argsWithExtensions);
        return argsWithExtensions;
    }

    private void addMappings(final WireMockServer wireMockServer) {
        wireMockServer.addStubMapping(
                get(urlPathMatching("/patients/[a-zA-Z0-9]+"))
                        .willReturn(
                                aResponse()
                                        .withBody("Empty patient response")
                                        .withStatus(200)
                                        .withHeader("Content-Type", "application/json")
                                        .withHeader("Cache-Control", "no-cache")
                                        .withTransformers(PatientResponseTransformer.PATIENT_RESPONSE_TRANSFORMER)
                        )
                        .build()
        );
        wireMockServer.addStubMapping(
                post(urlPathMatching("/patients/[a-zA-Z0-9]+"))
                        .withHeader("Content-Type", matching("application/json"))
                        .willReturn(
                                aResponse()
                                        .withStatus(200)
                                        .withHeader("Cache-Control", "no-cache")
                        )
                        .build()
        );
    }
}
