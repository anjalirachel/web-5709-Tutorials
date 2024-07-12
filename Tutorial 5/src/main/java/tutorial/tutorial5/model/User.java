package tutorial.tutorial5.model;

public class User {
    private String email;
    private String firstName;
    private String id;

    public User() {
    }

    public User(String email, String firstName, String id) {
        this.email = email;
        this.firstName = firstName;
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
