package name.webdizz.performance.testing.patient.mock.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import name.webdizz.performance.testing.client.patient.domain.Patient;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.github.tomakehurst.wiremock.common.FileSource;
import com.github.tomakehurst.wiremock.extension.ResponseTransformer;
import com.github.tomakehurst.wiremock.http.Request;
import com.github.tomakehurst.wiremock.http.ResponseDefinition;

public class PatientResponseTransformer extends ResponseTransformer {

    public static final String PATIENT_RESPONSE_TRANSFORMER = "patient-response-transformer";
    private static final Logger LOGGER = LoggerFactory.getLogger(PatientResponseTransformer.class);
    private final ObjectMapper mapper;

    public PatientResponseTransformer() {
        mapper = new ObjectMapper()
                .setSerializationInclusion(JsonInclude.Include.NON_NULL)
                .configure(SerializationFeature.INDENT_OUTPUT, true)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }


    @Override
    public ResponseDefinition transform(final Request request, final ResponseDefinition responseDefinition, final FileSource files) {
        String patientHashedId = request.getUrl().replace("/patients/", "");
        final Patient patientEntity = createPatient(patientHashedId);
        try {
            responseDefinition.setBody(mapper.writeValueAsString(patientEntity));
        } catch (JsonProcessingException jpe) {
            LOGGER.error("Unable to convert patient to JSON string", jpe);
        }
        return responseDefinition;
    }

    private Patient createPatient(final String patientHashedId) {
        final Patient patientEntity = new Patient();
        patientEntity.setInsuranceHashedId(patientHashedId);
        patientEntity.setFirstName("Firstname for " + patientHashedId);
        patientEntity.setLastName("Lastname for " + patientHashedId);
        return patientEntity;
    }

    @Override
    public String name() {
        return PATIENT_RESPONSE_TRANSFORMER;
    }
}
