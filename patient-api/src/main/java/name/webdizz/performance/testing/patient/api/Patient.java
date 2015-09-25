package name.webdizz.performance.testing.patient.api;

import lombok.Data;

@Data
public class Patient {
    private String insuranceHashedId;
    private String firstName;
    private String lastName;
}
