package entity.product;

public class Product {

	private int id;
	
	private String title;

	private int quantity; // quantity in the stock, not in the cart

	private int price;

	private double weight;
	
	private String imageURL;

	private boolean rushOrderEligible;

	public Product() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public boolean isRushOrderEligible() {
		return rushOrderEligible;
	}

	public void setRushOrderEligible(boolean rushOrderEligible) {
		this.rushOrderEligible = rushOrderEligible;
	}
	
	




}
